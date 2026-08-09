/// gml_Object_ni_Create_0
// locals: __b__
action_set_alarm(1200, 0);
__b__ = action_if_dice(2);
if (__b__) {
    depth = -3990;
} else {
    depth = 20;
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(n3, 0, 1);
    } else {
        action_sprite_set(n2, 0, 1);
    }
}
__b__ = action_if_dice(2);
if (__b__) {
    action_set_motion(30, 7);
} else {
    action_set_motion(30, 4);
}
__b__ = action_if_dice(2);
if (__b__) {
    action_kill_object();
}
