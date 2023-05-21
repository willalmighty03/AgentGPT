import {
  FaBrain,
  FaCheckCircle,
  FaCircleNotch,
  FaStar,
  FaStopCircle,
  FaThumbtack,
} from "react-icons/fa";
import type { Message } from "../../types/agentTypes";
import {
  getTaskStatus,
  isTask,
  MESSAGE_TYPE_GOAL,
  MESSAGE_TYPE_THINKING,
  TASK_COMPLETED,
  TASK_CREATED,
  TASK_EXECUTING,
} from "../../types/agentTypes";

export const getMessageContainerStyle = (message: Message) => {
  if (!isTask(message)) {
    return "border-white/10 hover:border-white/40";
  }

  switch (message.status) {
    case TASK_CREATED:
      return "border-white/20 hover:border-white/40";
    case TASK_EXECUTING:
      return "border-white/20 hover:border-white/40";
    case TASK_COMPLETED:
      return "border-green-500 hover:border-green-400";
    default:
      return "";
  }
};

export const getTaskStatusIcon = (
  message: Message,
  config: { [key: string]: string | boolean | undefined }
) => {
  const taskStatusIconClass = "mr-1 mb-1 inline-block";
  const { isAgentStopped } = config;

  if (message.type === MESSAGE_TYPE_GOAL) {
    return <FaStar className="text-yellow-300" />;
  } else if (message.type === MESSAGE_TYPE_THINKING) {
    return <FaBrain className="mt-[0.1em] text-pink-400" />;
  } else if (getTaskStatus(message) === TASK_CREATED) {
    return <FaThumbtack className={`${taskStatusIconClass} -rotate-45`} />;
  } else if (getTaskStatus(message) === TASK_EXECUTING) {
    return isAgentStopped ? (
      <FaStopCircle className={`${taskStatusIconClass}`} />
    ) : (
      <FaCircleNotch className={`${taskStatusIconClass} animate-spin`} />
    );
  } else if (getTaskStatus(message) === TASK_COMPLETED) {
    return (
      <FaCheckCircle className={`${taskStatusIconClass} text-green-500 hover:text-green-400`} />
    );
  }
};
