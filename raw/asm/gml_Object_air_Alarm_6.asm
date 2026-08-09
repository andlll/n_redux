// gml_Object_air_Alarm_6  locals=1 args=0 len=144
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 6
00000018: conv.i.v
0000001C: push.imm.e 8
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 1
00000034: conv.i.v
00000038: call action_set_relative(argc=1)
00000040: popz
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 612
00000058: conv.i.v
0000005C: call action_create_object(argc=3)
00000064: popz
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: call action_set_relative(argc=1)
00000078: popz
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: call action_set_relative(argc=1)
0000008C: popz