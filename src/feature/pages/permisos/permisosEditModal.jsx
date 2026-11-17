import PermisoForm from './permisosForm'

const PermisoEdit = ({ onCancel, onSaved }) => (
  <PermisoForm onCancel={onCancel} onSaved={onSaved} />
)

export default PermisoEdit
export { PermisoEdit }