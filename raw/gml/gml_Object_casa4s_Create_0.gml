/// gml_Object_casa4s_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
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
action_set_alarm(600, 4);
action_set_alarm(960, 6);
action_set_alarm(34, 5);
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
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d411, 0, 0);
                action_set_relative(0);
                action_sprite_set(c411s, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d413, 0, 0);
                action_set_relative(0);
                action_sprite_set(c413s, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d421, 0, 0);
                action_set_relative(0);
                action_sprite_set(c421, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d423, 0, 0);
                action_set_relative(0);
                action_sprite_set(c423, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d431, 0, 0);
            action_set_relative(0);
            action_sprite_set(c431, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d433, 0, 0);
            action_set_relative(0);
            action_sprite_set(c433, 0, 1);
        }
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d441, 0, 0);
            action_set_relative(0);
            action_sprite_set(c441, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d443, 0, 0);
            action_set_relative(0);
            action_sprite_set(c443, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d451, 0, 0);
            action_set_relative(0);
            action_sprite_set(c451, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d453, 0, 0);
            action_set_relative(0);
            action_sprite_set(c453, 0, 1);
        }
    }
}
action_set_relative(0);
