// gml_Object_mongo_Alarm_5  locals=2 args=0 len=368
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 5
00000018: conv.i.v
0000001C: push.imm.e 57
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 156
00000034: pushenv 0x20B3858
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 1
00000044: conv.i.v
00000048: push.v storm
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20B3858
00000070: b 0x20B3860
00000074: popenv 0x40B381C
00000078: b 0x20B3864
0000007C: popenv 0x1CB3860
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20B3940
00000090: push.imm.e 68
00000094: conv.i.v
00000098: call action_if_dice(argc=1)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x20B3940
000000B8: push.imm.e 1
000000BC: conv.i.v
000000C0: call action_set_relative(argc=1)
000000C8: popz
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.imm.e 444
000000E0: conv.i.v
000000E4: call action_create_object(argc=3)
000000EC: popz
000000F0: push.imm.e 0
000000F4: conv.i.v
000000F8: call action_set_relative(argc=1)
00000100: popz
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: call action_set_relative(argc=1)
00000114: popz
00000118: push.imm.e 0
0000011C: conv.i.v
00000120: push.imm.e 0
00000124: conv.i.v
00000128: push.imm.e 606
0000012C: conv.i.v
00000130: call action_create_object(argc=3)
00000138: popz
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: call action_set_relative(argc=1)
0000014C: popz
00000150: call action_kill_object(argc=0)
00000158: popz
0000015C: push.imm.e 0
00000160: conv.i.v
00000164: call action_set_relative(argc=1)
0000016C: popz