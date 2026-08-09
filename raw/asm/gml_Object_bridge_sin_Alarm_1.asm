// gml_Object_bridge_sin_Alarm_1  locals=1 args=0 len=100
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 3600
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.d 0.2
00000028: conv.d.v
0000002C: push.imm.e 0
00000030: conv.i.v
00000034: push.imm.e 442
00000038: conv.i.v
0000003C: call action_sprite_set(argc=3)
00000044: popz
00000048: push.imm.e 3
0000004C: conv.i.v
00000050: push.imm.e 30
00000054: conv.i.v
00000058: call action_set_alarm(argc=2)
00000060: popz