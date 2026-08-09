/// gml_Object_air_Create_0
// locals: __b__
action_set_alarm(45, 5);
life = 2;
piro = 0;
col = 0;
__b__ = action_if_dice(2);
if (__b__) {
    action_set_motion(30, 16);
} else {
    action_set_motion(30, 13);
}
__b__ = action_if_dice(2);
if (__b__) {
    depth = -3990;
    desto = 1;
} else {
    depth = 2;
    action_sprite_transform(0.75, 0.75, 0, 0);
    desto = 0;
}
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
action_set_alarm(40, 0);
action_set_alarm(3000, 1);
__b__ = action_if_dice(3);
if (__b__) {
    action_sprite_set(figros, 0, 1);
    col = 1;
}
__b__ = action_if_dice(3);
if (__b__) {
    action_sprite_set(figgg, 0, 1);
    col = 2;
}
__b__ = action_if_dice(3);
if (__b__) {
    action_sprite_set(figb, 0, 1);
    col = 3;
}
