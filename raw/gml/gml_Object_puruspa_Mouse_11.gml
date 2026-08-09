/// gml_Object_puruspa_Mouse_11
// locals: __b__
with (r12) {
    __b__ = action_if_variable(selec, 11, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_set(russ, 0, 1);
} else {
    action_sprite_set(ru, 0, 1);
}
over = 0;
with (busmob) {
    action_kill_object();
}
with (buscrof) {
    action_kill_object();
}
with (filler) {
    action_kill_object();
}
