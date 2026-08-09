/// gml_Object_positiona_Mouse_54
// locals: __b__
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    __b__ = action_if_variable(mouse_y, view_yview[0] + view_hview[0] - 100, 2);
    if (__b__) {
        action_move_to(mouse_x - des, mouse_y - desy);
    }
}
