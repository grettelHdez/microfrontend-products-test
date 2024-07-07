export interface Record {
  id: string
  editable: boolean
}

export interface IEditableCell {
  id: string
  editable: boolean
  value: string
  column: string
  onChange: (value: string) => void
}
