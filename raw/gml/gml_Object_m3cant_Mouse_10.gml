/// gml_Object_m3cant_Mouse_10
// locals: __b__
__b__ = action_if_variable(phase, 2, 2);
if (__b__) {
    __b__ = action_if_variable(phase, 10, 1);
    if (__b__) {
        redder = 1;
        depth = -7000;
        action_sprite_color(0, 0.4);
    }
}
