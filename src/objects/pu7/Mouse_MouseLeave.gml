/// gml_Object_pu7_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlocinque, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 7, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(p7ss, 0, 1);
    } else {
        action_sprite_set(p7, 0, 1);
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
