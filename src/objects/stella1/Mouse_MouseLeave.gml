/// gml_Object_stella1_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlocinque, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 71, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(sta1s, 0, 1);
    } else {
        action_sprite_set(sta1, 0, 1);
    }
    over = 0;
}
with (busmob) {
    action_kill_object();
}
with (buscrof) {
    action_kill_object();
}
with (unloparcoo) {
    action_kill_object();
}
with (cc500park) {
    action_kill_object();
}
with (cc20000monu) {
    action_kill_object();
}
