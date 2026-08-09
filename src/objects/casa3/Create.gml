/// gml_Object_casa3_Create_0
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
                    action_create_object(d354, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c354, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d353, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c353, 0, 1);
                }
            } else {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(d312, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c312, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d313, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c313, 0, 1);
                }
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d314, 0, 0);
                action_set_relative(0);
                action_sprite_set(c314, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d321, 0, 0);
                action_set_relative(0);
                action_sprite_set(c321, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d322, 0, 0);
                action_set_relative(0);
                action_sprite_set(c322, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d323, 0, 0);
                action_set_relative(0);
                action_sprite_set(c323, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d324, 0, 0);
                action_set_relative(0);
                action_sprite_set(c324, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d331, 0, 0);
                action_set_relative(0);
                action_sprite_set(c331, 0, 1);
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
                    action_create_object(d352, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c352, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d351, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c351, 0, 1);
                }
            } else {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(d332, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c332, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d333, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c333, 0, 1);
                }
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d334, 0, 0);
                action_set_relative(0);
                action_sprite_set(c334, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d341, 0, 0);
                action_set_relative(0);
                action_sprite_set(c341, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d342, 0, 0);
                action_set_relative(0);
                action_sprite_set(c342, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d343, 0, 0);
                action_set_relative(0);
                action_sprite_set(c343, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d344, 0, 0);
                action_set_relative(0);
                action_sprite_set(c344, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d311, 0, 0);
                action_set_relative(0);
            }
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
action_set_alarm(23, 5);
action_set_alarm(600, 4);
action_set_alarm(960, 6);
action_set_alarm(120, 3);
ava = 0;
life = 300;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 40;
    action_set_relative(0);
}
with (r12) {
    action_set_relative(1);
    pop = pop + 40;
    action_set_relative(0);
}
depth = -y;
action_set_relative(0);
