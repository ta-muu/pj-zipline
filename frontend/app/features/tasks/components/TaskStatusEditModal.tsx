import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { updateTask } from "../api/update-task";
import type { Task } from "../types.ts";

interface TaskStatusEditModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

const statusToJapanese = (status: Task["status"]) => {
  switch (status) {
    case "todo":
      return "未着手";
    case "in_progress":
      return "作業中";
    case "done":
      return "完了";
    default:
      return status;
  }
};

const TaskStatusEditModal: React.FC<TaskStatusEditModalProps> = ({
  open,
  onClose,
  task,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Task["status"]>("todo");

  useEffect(() => {
    if (task) {
      setSelectedStatus(task.status);
    }
  }, [task]);

  const handleSave = async () => {
    if (task) {
      try {
        await updateTask(task.id, {
          status: selectedStatus,
        });
        onClose();
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<Task["status"]>) => {
    setSelectedStatus(event.target.value as Task["status"]);
  };

  if (!task) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>状態の編集: {task.title}</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <InputLabel id="status-select-label">状態</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus}
            onChange={handleStatusChange}
            label="状態"
          >
            {(["todo", "in_progress", "done"] as const).map((status) => (
              <MenuItem key={status} value={status}>
                {statusToJapanese(status)}
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

export default TaskStatusEditModal;
