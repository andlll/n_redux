/// gml_Object_pudj_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlosei, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 60, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(pdjss, 0, 1);
    } else {
        action_sprite_set(pdj, 0, 1);
    }
    over = 0;
}
with (cc3500deejay) {
    action_kill_object();
}
with (level2club) {
    action_kill_object();
}
