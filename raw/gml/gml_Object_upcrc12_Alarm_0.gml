/// gml_Object_upcrc12_Alarm_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(tic, 0, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(60, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ce12, 0, 1);
    }
    action_create_object(gru, 54, 106);
    action_create_object(gru, 178, 38);
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
        action_sprite_set(ce13, 0, 1);
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
        action_sprite_set(ce14, 0, 1);
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
        action_sprite_set(ce15, 0, 1);
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
        action_sprite_set(ce16, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 5, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(800, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ce17, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 6, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ce18, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 7, 0);
if (__b__) {
    tic = tic + 1;
    action_set_relative(0);
    action_set_alarm(30, 0);
    action_set_relative(1);
    with (chies) {
        action_sprite_set(ce19, 0, 1);
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
        action_sprite_set(ce20, 0, 1);
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
        action_sprite_set(ce21, 0, 1);
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
        action_sprite_set(ce22, 0, 1);
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
        action_sprite_set(ce23, 0, 1);
    }
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 12, 0);
if (__b__) {
    with (chies) {
        action_set_relative(0);
        level = 2;
        action_set_relative(1);
    }
    with (chies) {
        life = life + 500;
    }
    with (chies) {
        action_sprite_set(crc4, 0, 1);
    }
    action_create_object(cddvd2, 0, 0);
    action_kill_object();
}
action_set_relative(0);
