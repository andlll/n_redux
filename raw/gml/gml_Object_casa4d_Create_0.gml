/// gml_Object_casa4d_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d412, 0, 0);
                action_set_relative(0);
                action_sprite_set(c412d, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d414, 0, 0);
                action_set_relative(0);
                action_sprite_set(c414d, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d422, 0, 0);
                action_set_relative(0);
                action_sprite_set(c422, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d424, 0, 0);
                action_set_relative(0);
                action_sprite_set(c424, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d432, 0, 0);
            action_set_relative(0);
            action_sprite_set(c432, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d434, 0, 0);
            action_set_relative(0);
            action_sprite_set(c434, 0, 1);
        }
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d442, 0, 0);
            action_set_relative(0);
            action_sprite_set(c442, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d444, 0, 0);
            action_set_relative(0);
            action_sprite_set(c444, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d452, 0, 0);
            action_set_relative(0);
            action_sprite_set(c452, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d454, 0, 0);
            action_set_relative(0);
            action_sprite_set(c454, 0, 1);
        }
    }
}
action_set_relative(1);
action_create_object(ruindeath, 0, 0);
action_set_relative(0);
action_set_relative(1);
action_create_object(pplo, 0, 0);
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
action_set_alarm(2000, 2);
action_set_alarm(34, 5);
action_set_alarm(960, 6);
action_set_alarm(600, 4);
action_set_alarm(120, 3);
ava = 0;
life = 400;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 100;
    action_set_relative(0);
}
with (r12) {
    action_set_relative(1);
    pop = pop + 37;
    action_set_relative(0);
}
depth = -y + 3;
action_set_relative(0);
