/// gml_Object_positionb_Step_0
// locals: __b__
__b__ = action_if_variable(mouse_y, view_yview[0] + view_hview[0] - 100, 2);
if (__b__) {
    __b__ = action_if_variable(os_type, 4, 0);
    if (__b__) {
        __b__ = action_if_mouse(1);
        if (__b__) {
            action_move_to(mouse_x, mouse_y);
        }
    }
}
__b__ = action_if_variable(mouse_y, view_yview[0] + view_hview[0] - 100, 2);
if (__b__) {
    __b__ = action_if_variable(os_type, 0, 0);
    if (__b__) {
        __b__ = action_if_mouse(2);
        if (__b__) {
            action_move_to(mouse_x, mouse_y);
        }
    }
}
