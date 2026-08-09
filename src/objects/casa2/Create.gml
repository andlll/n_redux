/// gml_Object_casa2_Create_0
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
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(d254, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c254, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d253, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c253, 0, 1);
                }
            } else {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(d212, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c212, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d213, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c213, 0, 1);
                }
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d214, 0, 0);
                action_set_relative(0);
                action_sprite_set(c214, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d221, 0, 0);
                action_set_relative(0);
                action_sprite_set(c221, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d222, 0, 0);
                action_set_relative(0);
                action_sprite_set(c222, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d223, 0, 0);
                action_set_relative(0);
                action_sprite_set(c223, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d224, 0, 0);
                action_set_relative(0);
                action_sprite_set(c224, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d231, 0, 0);
                action_set_relative(0);
                action_sprite_set(c231, 0, 1);
            }
        }
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(d252, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c252, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d251, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c251, 0, 1);
                }
            } else {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(d232, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c232, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d233, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c233, 0, 1);
                }
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d234, 0, 0);
                action_set_relative(0);
                action_sprite_set(c234, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d241, 0, 0);
                action_set_relative(0);
                action_sprite_set(c241, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d242, 0, 0);
                action_set_relative(0);
                action_sprite_set(c242, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d243, 0, 0);
                action_set_relative(0);
                action_sprite_set(c243, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d244, 0, 0);
                action_set_relative(0);
                action_sprite_set(c244, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d211, 0, 0);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(1);
action_create_object(pplo, 0, 0);
action_set_relative(0);
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
action_set_alarm(2000, 2);
action_set_alarm(600, 4);
action_set_alarm(45, 5);
action_set_alarm(480, 6);
action_set_alarm(120, 3);
ava = 0;
di = 0;
life = 200;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 25;
    action_set_relative(0);
}
with (r12) {
    action_set_relative(1);
    pop = pop + 14;
    action_set_relative(0);
}
depth = -y;
action_set_relative(0);
