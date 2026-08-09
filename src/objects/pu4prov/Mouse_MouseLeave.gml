/// gml_Object_pu4prov_Mouse_11
// locals: __b__
with (scroller2) {
    goer = 1;
}
__b__ = action_if_variable(unlos, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 4, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(p4ss, 0, 1);
    } else {
        action_sprite_set(p4, 0, 1);
    }
    over = 0;
}
with (cc50000vent) {
    action_kill_object();
}
with (leve3tounlo4) {
    action_kill_object();
}
with (busmob) {
    action_kill_object();
}
with (buscrof) {
    action_kill_object();
}
