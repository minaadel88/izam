"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Settings, Home, Briefcase, Users, Award, Info, Phone, GripVertical,
  Eye, EyeOff, Save, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { fetchNavigation, updateNavigation, trackNavChange } from "@/lib/api";
import { toast } from "sonner";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  visible: boolean;
}

interface SortableItemProps {
  item: NavItem;
  isEditMode: boolean;
  onVisibilityToggle: (id: string) => void;
  onLabelChange: (id: string, newLabel: string) => void;
}

function SortableItem({ item, isEditMode, onVisibilityToggle, onLabelChange }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(item.label);

  const handleDoubleClick = () => {
    if (isEditMode) {
      setIsEditing(true);
    }
  };

  const handleLabelSave = () => {
    onLabelChange(item.id, label);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "cursor-pointer"
      )}
      onDoubleClick={handleDoubleClick}
    >
      {isEditMode && (
        <button {...listeners} className="cursor-grab">
          <GripVertical className="h-4 w-4" />
        </button>
      )}
      
      {getIcon(item.icon)}

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="h-7 py-1"
            autoFocus
            onBlur={handleLabelSave}
            onKeyDown={(e) => e.key === 'Enter' && handleLabelSave()}
          />
        </div>
      ) : (
        <span className={cn(!item.visible && "opacity-50")}>{item.label}</span>
      )}

      {isEditMode && !isEditing && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onVisibilityToggle(item.id)}
        >
          {item.visible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}

function getIcon(name: string) {
  const icons: { [key: string]: React.ReactNode } = {
    home: <Home className="h-4 w-4" />,
    briefcase: <Briefcase className="h-4 w-4" />,
    user: <Users className="h-4 w-4" />,
    award: <Award className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
    phone: <Phone className="h-4 w-4" />,
  };
  return icons[name] || <Info className="h-4 w-4" />;
}

interface DashboardNavProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

export function DashboardNav({ isOpen, setIsOpen, isEditMode, setIsEditMode }: DashboardNavProps) {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [originalItems, setOriginalItems] = useState<NavItem[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadNavigation = async () => {
      const data = await fetchNavigation();
      if (data && typeof data === 'object' && 'items' in data) {
        setNavItems((data as { items: NavItem[] }).items);
        setOriginalItems((data as { items: NavItem[] }).items);
      }
    };
    loadNavigation();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = navItems.findIndex((item) => item.id === active.id);
      const newIndex = navItems.findIndex((item) => item.id === over.id);
      
      const newItems = arrayMove(navItems, oldIndex, newIndex);
      setNavItems(newItems);
      
      await trackNavChange({
        id: active.id as string,
        from: oldIndex,
        to: newIndex,
      });
    }
  };

  const handleVisibilityToggle = (id: string) => {
    setNavItems(items =>
      items.map(item =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const handleLabelChange = (id: string, newLabel: string) => {
    setNavItems(items =>
      items.map(item =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    );
  };

  const handleSave = async () => {
    try {
      await updateNavigation(navItems);
      setOriginalItems(navItems);
      setIsEditMode(false);
      toast.success("Navigation changes saved successfully");
    } catch (error) {
      toast.error("Failed to save navigation changes");
    }
  };

  const handleCancel = () => {
    setNavItems(originalItems);
    setIsEditMode(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex w-72 flex-col bg-card shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <div className="flex gap-2">
            {isEditMode ? (
              <>
                     <Button variant="ghost" size="icon" onClick={handleCancel}>
        <img src="/1.png" alt="Cancel" className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleSave}>
        <img src="/0.png" alt="Save" className="h-4 w-4" />
      </Button>
    </>
  ) : (
    <Button variant="ghost" size="icon" onClick={() => setIsEditMode(true)}>
      <img src="/10.png" alt="Edit" className="h-4 w-4" />
    </Button>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={navItems}
                strategy={verticalListSortingStrategy}
              >
                {navItems.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    isEditMode={isEditMode}
                    onVisibilityToggle={handleVisibilityToggle}
                    onLabelChange={handleLabelChange}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}