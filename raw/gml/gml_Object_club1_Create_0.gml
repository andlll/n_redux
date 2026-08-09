/// gml_Object_club1_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(club11, 0, 1);
        xi = 2;
        action_set_relative(1);
        action_create_object(clublite1, 0, 0);
        action_set_relative(0);
    } else {
        action_sprite_set(club12, 0, 1);
        xi = 3;
        action_set_relative(1);
        action_create_object(clublite2, 0, 0);
        action_set_relative(0);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(club13, 0, 1);
        xi = 1;
        action_set_relative(1);
        action_create_object(clublite3, 0, 0);
        action_set_relative(0);
    } else {
        action_sprite_set(club14, 0, 1);
        xi = 4;
        action_set_relative(1);
        action_create_object(clublite4, 0, 0);
        action_set_relative(0);
    }
}
action_set_relative(1);
action_create_object(ruindeath, 0, 0);
action_set_relative(0);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(15201023, 1);
}
with (r12) {
    action_set_relative(1);
    wewe = wewe + 20;
    action_set_relative(0);
}
deming = 0;
arp = 0;
action_set_alarm(35, 5);
life = 50;
upo = 0;
depth = -y;
action_set_relative(0);
