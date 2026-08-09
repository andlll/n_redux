/// gml_Object_nidark_slow_Create_0
// locals: __b__
action_set_alarm(60, 0);
action_set_alarm(2400, 2);
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
        action_sprite_set(n3d, 0, 1);
    } else {
        action_sprite_set(n2d, 0, 1);
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
