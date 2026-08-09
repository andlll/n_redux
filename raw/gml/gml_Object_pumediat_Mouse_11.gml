/// gml_Object_pumediat_Mouse_11
// locals: __b__
__b__ = action_if_variable(unlosei, 1, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 70, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(pmuseoss, 0, 1);
    } else {
        action_sprite_set(pmuseo, 0, 1);
    }
    over = 0;
}
with (cc35000media) {
    action_kill_object();
}
with (level3tounlomedia) {
    action_kill_object();
}
with (dragermedia) {
    action_kill_object();
}
