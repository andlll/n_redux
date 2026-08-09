/// gml_Object_stella3_Mouse_11
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
        action_sprite_set(sta3s, 0, 1);
    } else {
        action_sprite_set(sta3, 0, 1);
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
with (ccfree) {
    action_kill_object();
}
with (cc200000m3) {
    action_kill_object();
}
with (ccunlom3) {
    action_kill_object();
}
