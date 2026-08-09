/// gml_Object_pu1_Mouse_11
// locals: __b__
with (r12) {
    __b__ = action_if_variable(selec, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_set(p1ss, 0, 1);
} else {
    action_sprite_set(p1, 0, 1);
}
over = 0;
with (busmob) {
    action_kill_object();
}
with (buscrof) {
    action_kill_object();
}
with (cc100) {
    action_kill_object();
}
