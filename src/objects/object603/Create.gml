/// gml_Object_object603_Create_0
// locals: __b__
depth = -y - 150;
action_set_motion(70, 1.3);
action_set_alarm(69, 0);
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(cc2, 0, 1);
    } else {
        action_sprite_set(cc3, 0, 1);
    }
}
__b__ = action_if_dice(4);
if (__b__) {
    action_kill_object();
}
