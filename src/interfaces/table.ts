export interface Record {
  id?: string | undefined
  editable?: boolean
}

export interface IEditableCell {
  id: string | undefined
  editable?: boolean
  value: string
  column: string
  onChange: (value: string) => void
}
