// gml_Object_impavent_dem_Alarm_1  locals=1 args=0 len=72
// locals: arguments
00000000: push.d -0.01
0000000C: conv.d.v
00000010: push.imm.e 14
00000014: conv.i.v
00000018: push.imm.e 336
0000001C: conv.i.v
00000020: call action_sprite_set(argc=3)
00000028: popz
0000002C: push.imm.e 2
00000030: conv.i.v
00000034: push.imm.e 1400
00000038: conv.i.v
0000003C: call action_set_alarm(argc=2)
00000044: popz