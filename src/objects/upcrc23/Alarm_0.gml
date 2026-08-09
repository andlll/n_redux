/// gml_Object_upcrc23_Alarm_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(tic, 0, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(60, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci22, 0, 1);
    }
    action_create_object(grubig, 54, 106);
    action_create_object(grubig, 178, 38);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 1, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(60, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci23, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 2, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(60, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci24, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 3, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(60, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci25, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 4, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(60, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci26, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 5, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(60, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci27, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 6, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(60, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci28, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 7, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(2000, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci29, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 8, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci30, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 9, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci31, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 10, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci32, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 11, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci33, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 12, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci34, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 13, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci35, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 14, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci36, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 15, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ci37, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 16, 0);
if (__b__) {
    with (chies) {
        action_set_relative(0);
        level = 3;
        action_set_relative(1);
    }
    with (chies) {
        life = life + 500;
    }
    with (chies) {
        action_sprite_set(crc5, 0, 1);
    }
    action_create_object(cddvd3, 0, 0);
    action_create_object(cddvd32, 0, 0);
    action_create_object(cddvd33, 0, 0);
    action_create_object(cddvd34, 0, 0);
    action_create_object(cddvd35, 0, 0);
    action_kill_object();
}
action_set_relative(0);
