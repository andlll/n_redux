/// gml_Object_pusolare_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlosei, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 61, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(psolaress, 0, 1);
    } else {
        action_sprite_set(psolare, 0, 1);
    }
    over = 0;
}
with (cc1000sol) {
    action_kill_object();
}
with (level2sol) {
    action_kill_object();
}
