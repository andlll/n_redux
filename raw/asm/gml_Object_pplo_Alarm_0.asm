// gml_Object_pplo_Alarm_0  locals=2 args=0 len=520
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: call action_if_dice(argc=1)
00000010: pop.v.v local.__b__
00000018: push.local.v local.__b__
00000020: conv.v.b
00000024: bf 0x213CA80
00000028: push.imm.e 2
0000002C: conv.i.v
00000030: call action_if_dice(argc=1)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x213CA58
00000050: push.d 0.5
0000005C: conv.d.v
00000060: push.imm.e 30
00000064: conv.i.v
00000068: call action_set_motion(argc=2)
00000070: popz
00000074: b 0x213CA7C
00000078: push.d 0.5
00000084: conv.d.v
00000088: push.imm.e 330
0000008C: conv.i.v
00000090: call action_set_motion(argc=2)
00000098: popz
0000009C: b 0x213CAF4
000000A0: push.imm.e 2
000000A4: conv.i.v
000000A8: call action_if_dice(argc=1)
000000B0: pop.v.v local.__b__
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x213CAD0
000000C8: push.d 0.5
000000D4: conv.d.v
000000D8: push.imm.e 150
000000DC: conv.i.v
000000E0: call action_set_motion(argc=2)
000000E8: popz
000000EC: b 0x213CAF4
000000F0: push.d 0.5
000000FC: conv.d.v
00000100: push.imm.e 210
00000104: conv.i.v
00000108: call action_set_motion(argc=2)
00000110: popz
00000114: push.imm.e 2
00000118: conv.i.v
0000011C: call action_if_dice(argc=1)
00000124: pop.v.v local.__b__
0000012C: push.local.v local.__b__
00000134: conv.v.b
00000138: bf 0x213CB84
0000013C: push.imm.e 2
00000140: conv.i.v
00000144: call action_if_dice(argc=1)
0000014C: pop.v.v local.__b__
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x213CB64
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: push.imm.e 58
00000170: conv.i.v
00000174: call action_set_alarm(argc=2)
0000017C: popz
00000180: b 0x213CB80
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 73
00000190: conv.i.v
00000194: call action_set_alarm(argc=2)
0000019C: popz
000001A0: b 0x213CBE8
000001A4: push.imm.e 0
000001A8: conv.i.v
000001AC: push.imm.e 36
000001B0: conv.i.v
000001B4: call action_set_alarm(argc=2)
000001BC: popz
000001C0: push.imm.e 2
000001C4: conv.i.v
000001C8: call action_if_dice(argc=1)
000001D0: pop.v.v local.__b__
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x213CBE8
000001E8: push.imm.e 0
000001EC: conv.i.v
000001F0: push.imm.e 83
000001F4: conv.i.v
000001F8: call action_set_alarm(argc=2)
00000200: popz
00000204: b 0x213CBE8