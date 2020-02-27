enum ImportanceLevelEnum {
  LOW,
  NORMAL,
  HIGH
}

export interface TodoItem {
  // importanceLevel: ImportanceLevelEnum;
  // lastDate?: Date;
  title: string;
  id: string;
  content: string;
  childs: TodoItem[];
  _childIds: string[];
  _isMain: boolean;
}
