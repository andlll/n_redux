/// gml_Object_zoom_plus_Mouse_4
// locals: __b__
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    __b__ = action_if_variable(global.sca, 1, 1);
    if (!__b__) {
        active = 1;
    }
}
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    __b__ = action_if_variable(global.sca, 1, 1);
    if (!__b__) {
        active = 1;
    }
}
