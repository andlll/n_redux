/// gml_Object_scroller3_Step_0
// locals: __b__
__b__ = action_if_variable(mouse_y, 800, 4);
if (__b__) {
    __b__ = action_if_mouse(1);
    if (__b__) {
        rshift = scroller3.x - mouse_x;
    }
}
