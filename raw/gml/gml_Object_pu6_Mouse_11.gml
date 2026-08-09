/// gml_Object_pu6_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlosei, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 6, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(p6ss, 0, 1);
    } else {
        action_sprite_set(p6, 0, 1);
    }
    over = 0;
}
with (cc5000c) {
    action_kill_object();
}
with (drager) {
    action_kill_object();
}
with (level2palazz) {
    action_kill_object();
}
