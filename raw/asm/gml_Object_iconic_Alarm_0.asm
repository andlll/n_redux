// gml_Object_iconic_Alarm_0  locals=1 args=0 len=112
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 716
00000014: conv.i.v
00000018: call action_create_object(argc=3)
00000020: popz
00000024: push.imm.e 715
00000028: pushenv 0x21EB418
0000002C: call action_kill_object(argc=0)
00000034: popz
00000038: popenv 0x41EB40C
0000003C: push.imm.e 714
00000040: pushenv 0x21EB430
00000044: call action_kill_object(argc=0)
0000004C: popz
00000050: popenv 0x41EB424
00000054: push.imm.e 3
00000058: conv.i.v
0000005C: push.imm.e 100
00000060: conv.i.v
00000064: call action_set_alarm(argc=2)
0000006C: popz