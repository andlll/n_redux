/// gml_Object_object37_Create_0
// locals: __b__
depth = -y - 1;
__b__ = action_if_dice(4);
if (__b__) {
    action_set_alarm(30, 3);
    action_set_alarm(30, 4);
} else {
    action_set_alarm(308, 3);
    action_set_alarm(308, 4);
}
