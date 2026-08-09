/// gml_Object_industria1_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
makee = 0;
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(i12, 0, 1);
        xi = 2;
        action_set_relative(1);
        action_create_object(di12, 0, 0);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(di12b, 0, 0);
        action_set_relative(0);
    } else {
        action_sprite_set(i13, 0, 1);
        xi = 3;
        action_set_relative(1);
        action_create_object(di13b, 0, 0);
        action_set_relative(0);
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(i11, 0, 1);
        action_set_relative(1);
        action_create_object(di11b, 0, 0);
        action_set_relative(0);
        xi = 1;
        action_set_relative(1);
        action_create_object(di11, 0, 0);
        action_set_relative(0);
    } else {
        action_sprite_set(i14, 0, 1);
        xi = 4;
        action_set_relative(1);
        action_create_object(di14b, 0, 0);
        action_set_relative(0);
        action_set_relative(1);
        action_create_object(di14, 0, 0);
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
with (r12) {
    action_set_relative(1);
    hap = hap + -50;
    action_set_relative(0);
}
deming = 0;
arp = 0;
action_set_alarm(35, 5);
action_set_alarm(300, 6);
life = 50;
upo = 0;
action_set_alarm(120, 2);
action_set_alarm(60, 3);
depth = -y;
action_set_relative(0);
