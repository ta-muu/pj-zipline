import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { updateTask } from "../api/update-task";
import type { Task } from "../types.ts";

interface TaskEditModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  allTasks: Task[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  open,
  onClose,
  task,
  allTasks,
}) => {
  const [selectedDependencies, setSelectedDependencies] = useState<number[]>([]);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (task) {
      setSelectedDependencies(task.dependencies || []);

      const getDescendants = (taskId: number): number[] => {
        const children = allTasks
          .filter((t) => t.dependencies.includes(taskId))
          .map((t) => t.id);
        return [...children, ...children.flatMap(getDescendants)];
      };

      const unselectableTaskIds = new Set([task.id, ...getDescendants(task.id)]);
      setAvailableTasks(allTasks.filter((t) => !unselectableTaskIds.has(t.id)));
    }
  }, [task, allTasks]);

  const handleSave = async () => {
    if (task) {
      try {
        await updateTask(task.id, {
          dependencies: selectedDependencies,
        });
        onClose();
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }
  };

  const handleDependenciesChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedDependencies(
      typeof value === "string" ? value.split(",").map(Number) : value,
    );
  };

  if (!task) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>前提タスクの編集: {task.title}</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 3, width: "100%" }}>
          <InputLabel id="dependencies-select-label">前提タスク</InputLabel>
          <Select
            labelId="dependencies-select-label"
            id="dependencies-select"
            multiple
            value={selectedDependencies}
            onChange={handleDependenciesChange}
            input={<OutlinedInput id="select-multiple-chip" label="前提タスク" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  const selectedTask = allTasks.find((t) => t.id === value);
                  return <Chip key={value} label={selectedTask?.title || value} />;
                })}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {availableTasks.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSave} variant="contained">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditModal;
