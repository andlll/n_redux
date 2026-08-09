// gml_Object_iconic_Alarm_2  locals=1 args=0 len=100
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 717
00000014: conv.i.v
00000018: call action_create_object(argc=3)
00000020: popz
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 0
00000030: conv.i.v
00000034: push.imm.e 715
00000038: conv.i.v
0000003C: call action_create_object(argc=3)
00000044: popz
00000048: push.imm.e 0
0000004C: conv.i.v
00000050: push.imm.e 100
00000054: conv.i.v
00000058: call action_set_alarm(argc=2)
00000060: popz