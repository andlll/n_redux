/// gml_Object_puvillone_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlosei, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 63, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(pvillass, 0, 1);
    } else {
        action_sprite_set(pvilla, 0, 1);
    }
    over = 0;
}
with (cc1000villa) {
    action_kill_object();
}
with (leve3tounlovilla) {
    action_kill_object();
}
