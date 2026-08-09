/// gml_Object_pu5prov_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlocinque, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 5, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(p5ss, 0, 1);
    } else {
        action_sprite_set(p5, 0, 1);
    }
    over = 0;
}
with (busmob) {
    action_kill_object();
}
with (buscrof) {
    action_kill_object();
}
with (leve3tounlo5) {
    action_kill_object();
}
with (cc20000laser) {
    action_kill_object();
}
