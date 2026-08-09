/// gml_Object_parco_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
oversolar = 0;
with (r12) {
    action_set_relative(1);
    hap = hap + 200;
    action_set_relative(0);
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
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(15201023, 1);
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(par1, 0, 1);
        } else {
            action_sprite_set(par2, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(par3, 0, 1);
        } else {
            action_sprite_set(par4, 0, 1);
        }
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(par5, 0, 1);
        } else {
            action_sprite_set(par6, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(par7, 0, 1);
        } else {
            action_sprite_set(par8, 0, 1);
        }
    }
}
__b__ = action_if_dice(4);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe, 0, 0);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_create_object(lampioncino, 0, 0);
        action_set_relative(0);
    }
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe, 40, 10);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_create_object(lampioncino, 40, 10);
        action_set_relative(0);
    }
}
__b__ = action_if_dice(3);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe, -40, 10);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_create_object(lampioncino, -40, 10);
        action_set_relative(0);
    }
}
__b__ = action_if_dice(4);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe, 5, -30);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_create_object(lampioncino, 5, -30);
        action_set_relative(0);
    }
}
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe, -7, 40);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_create_object(lampioncino, -7, 40);
        action_set_relative(0);
    }
}
__b__ = action_if_dice(4);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe, 70, 21);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_create_object(lampioncino, 70, 21);
        action_set_relative(0);
    }
}
__b__ = action_if_dice(3);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_set_relative(1);
        action_create_object(albe, -80, 7);
        action_set_relative(0);
    } else {
        action_set_relative(1);
        action_create_object(lampioncino, -80, 7);
        action_set_relative(0);
    }
}
depth = -y + 100;
action_set_alarm(67, 0);
action_set_relative(0);
