/// gml_Object_casa5ss_Create_0
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
                action_create_object(d512, 0, 0);
                action_set_relative(0);
                action_sprite_set(c512, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d514, 0, 0);
                action_set_relative(0);
                action_sprite_set(c514, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d522, 0, 0);
                action_set_relative(0);
                action_sprite_set(c522, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d524, 0, 0);
                action_set_relative(0);
                action_sprite_set(c524, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d532, 0, 0);
            action_set_relative(0);
            action_sprite_set(c532, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d534, 0, 0);
            action_set_relative(0);
            action_sprite_set(c534, 0, 1);
        }
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d542, 0, 0);
            action_set_relative(0);
            action_sprite_set(c542, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d544, 0, 0);
            action_set_relative(0);
            action_sprite_set(c544, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(1);
            action_create_object(d552, 0, 0);
            action_set_relative(0);
            action_sprite_set(c552, 0, 1);
        } else {
            action_set_relative(1);
            action_create_object(d554, 0, 0);
            action_set_relative(0);
            action_sprite_set(c554, 0, 1);
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
action_set_alarm(600, 4);
action_set_alarm(1920, 6);
action_set_alarm(45, 5);
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
