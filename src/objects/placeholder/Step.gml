/// gml_Object_placeholder_Step_0
// locals: __b__
with (r12) {
    __b__ = action_if_variable(oil, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_number(736, 0, 0);
    if (__b__) {
        action_kill_object();
    }
}
__b__ = action_if_variable(making, 1, 0);
if (__b__) {
    __b__ = action_if_variable(ult, 1, 0);
    if (__b__) {
        action_sprite_color(65280, 1);
    }
}
__b__ = action_if_variable(making, 1, 0);
if (__b__) {
    __b__ = action_if_variable(ult, 0, 0);
    if (__b__) {
        action_sprite_color(255, 1);
    }
}
with (r12) {
    __b__ = action_if_variable(selec, 6, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (placeholder) {
        scrolling = 0;
    }
}
