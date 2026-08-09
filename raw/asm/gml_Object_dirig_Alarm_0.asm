// gml_Object_dirig_Alarm_0  locals=2 args=0 len=428
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v piro
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20B1FB0
0000004C: push.imm.e 2
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 617
00000060: conv.i.v
00000064: call action_if_number(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20B1EE8
00000084: push.imm.e 2
00000088: conv.i.v
0000008C: call action_if_dice(argc=1)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20B1EE8
000000AC: push.imm.e -5
000000B0: conv.i.v
000000B4: push.imm.e -20
000000B8: conv.i.v
000000BC: push.imm.e 97
000000C0: conv.i.v
000000C4: call action_create_object(argc=3)
000000CC: popz
000000D0: push.imm.e 2
000000D4: conv.i.v
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 617
000000E4: conv.i.v
000000E8: call action_if_number(argc=3)
000000F0: pop.v.v local.__b__
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x20B1F6C
00000108: push.imm.e 2
0000010C: conv.i.v
00000110: call action_if_dice(argc=1)
00000118: pop.v.v local.__b__
00000120: push.local.v local.__b__
00000128: conv.v.b
0000012C: bf 0x20B1F6C
00000130: push.imm.e 5
00000134: conv.i.v
00000138: push.imm.e 20
0000013C: conv.i.v
00000140: push.imm.e 97
00000144: conv.i.v
00000148: call action_create_object(argc=3)
00000150: popz
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: call action_set_relative(argc=1)
00000164: popz
00000168: push.imm.e 0
0000016C: conv.i.v
00000170: push.imm.e 30
00000174: conv.i.v
00000178: call action_set_alarm(argc=2)
00000180: popz
00000184: push.imm.e 1
00000188: conv.i.v
0000018C: call action_set_relative(argc=1)
00000194: popz
00000198: push.imm.e 0
0000019C: conv.i.v
000001A0: call action_set_relative(argc=1)
000001A8: popz