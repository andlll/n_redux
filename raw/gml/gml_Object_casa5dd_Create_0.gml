/// gml_Object_casa5dd_Create_0
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
                action_create_object(d511, 0, 0);
                action_set_relative(0);
                action_sprite_set(c511, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d513, 0, 0);
                action_set_relative(0);
                action_sprite_set(c513, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d521, 0, 0);
                action_set_relative(0);
                action_sprite_set(c521, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d523, 0, 0);
                action_set_relative(0);
                action_sprite_set(c523, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d531, 0, 0);
            action_set_relative(0);
            action_sprite_set(c531, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d533, 0, 0);
            action_set_relative(0);
            action_sprite_set(c533, 0, 1);
        }
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d541, 0, 0);
            action_set_relative(0);
            action_sprite_set(c541, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d543, 0, 0);
            action_set_relative(0);
            action_sprite_set(c543, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d551, 0, 0);
            action_set_relative(0);
            action_sprite_set(c551, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d553, 0, 0);
            action_set_relative(0);
            action_sprite_set(c553, 0, 1);
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
action_set_alarm(45, 5);
action_set_alarm(1920, 6);
action_set_alarm(600, 4);
action_set_alarm(120, 3);
ava = 0;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 100;
    action_set_relative(0);
}
life = 700;
with (r12) {
    action_set_relative(1);
    pop = pop + 187;
    action_set_relative(0);
}
depth = -y + 3;
action_set_relative(0);
