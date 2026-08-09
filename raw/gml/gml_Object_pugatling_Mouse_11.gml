/// gml_Object_pugatling_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlosei, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 62, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(pgatlingss, 0, 1);
    } else {
        action_sprite_set(pgatling, 0, 1);
    }
    over = 0;
}
with (cc10000gat) {
    action_kill_object();
}
with (level2gatling) {
    action_kill_object();
}
