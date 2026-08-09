// gml_Object_fireworker_Alarm_1  locals=2 args=0 len=380
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 644
00000028: conv.i.v
0000002C: call action_if_number(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C4238
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 8
00000060: conv.i.v
00000064: call action_if_number(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20C4238
00000084: push.imm.e 644
00000088: pushenv 0x20C41DC
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 1
00000098: conv.i.v
0000009C: push.v mon
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20C41DC
000000C4: b 0x20C41E4
000000C8: popenv 0x40C41A0
000000CC: b 0x20C41E8
000000D0: popenv 0x1CC41E4
000000D4: push.local.v local.__b__
000000DC: conv.v.b
000000E0: bf 0x20C4238
000000E4: push.imm.e 0
000000E8: conv.i.v
000000EC: push.i 4259584
000000F4: conv.i.v
000000F8: push.imm.e 1
000000FC: conv.i.v
00000100: push.imm.e 20
00000104: conv.i.v
00000108: push.imm.e 50
0000010C: conv.i.v
00000110: push.imm.e 3
00000114: conv.i.v
00000118: call action_effect(argc=6)
00000120: popz
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: call action_set_relative(argc=1)
00000134: popz
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: push.imm.e 60
00000144: conv.i.v
00000148: call action_set_alarm(argc=2)
00000150: popz
00000154: push.imm.e 1
00000158: conv.i.v
0000015C: call action_set_relative(argc=1)
00000164: popz
00000168: push.imm.e 0
0000016C: conv.i.v
00000170: call action_set_relative(argc=1)
00000178: popz