// gml_Object_r12_Alarm_11  locals=2 args=0 len=752
// locals: arguments, __b__
00000000: push.imm.e 11
00000004: conv.i.v
00000008: push.imm.e 15000
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 617
00000030: conv.i.v
00000034: call action_if_number(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20C509C
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 717
00000068: conv.i.v
0000006C: call action_if_number(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20C509C
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.v exiting
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20C509C
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.imm.e 7
000000D8: conv.i.v
000000DC: call action_if_number(argc=3)
000000E4: pop.v.v local.__b__
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x20C509C
000000FC: push.imm.e 0
00000100: conv.i.v
00000104: push.imm.e 0
00000108: conv.i.v
0000010C: push.imm.e 8
00000110: conv.i.v
00000114: call action_if_number(argc=3)
0000011C: pop.v.v local.__b__
00000124: push.local.v local.__b__
0000012C: conv.v.b
00000130: bf 0x20C509C
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 736
00000148: conv.i.v
0000014C: call action_if_number(argc=3)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x20C4FDC
0000016C: push.imm.e 2
00000170: conv.i.v
00000174: push.imm.e 1000
00000178: conv.i.v
0000017C: push.v oil
00000184: call action_if_variable(argc=3)
0000018C: pop.v.v local.__b__
00000194: push.local.v local.__b__
0000019C: conv.v.b
000001A0: bf 0x20C4FD8
000001A4: push.imm.e 2
000001A8: conv.i.v
000001AC: push.imm.e 500
000001B0: conv.i.v
000001B4: push.v mon
000001BC: call action_if_variable(argc=3)
000001C4: pop.v.v local.__b__
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x20C4FD8
000001DC: push.imm.e 2
000001E0: conv.i.v
000001E4: push.v pop
000001EC: push.v hap
000001F4: call action_if_variable(argc=3)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x20C4FD8
00000214: push.s "nimsavbac"
0000021C: conv.s.v
00000220: call action_save_game(argc=1)
00000228: popz
0000022C: b 0x20C509C
00000230: push.imm.e 2
00000234: conv.i.v
00000238: push.imm.e 1000
0000023C: conv.i.v
00000240: push.v oil
00000248: call action_if_variable(argc=3)
00000250: pop.v.v local.__b__
00000258: push.local.v local.__b__
00000260: conv.v.b
00000264: bf 0x20C509C
00000268: push.imm.e 2
0000026C: conv.i.v
00000270: push.imm.e 500
00000274: conv.i.v
00000278: push.v mon
00000280: call action_if_variable(argc=3)
00000288: pop.v.v local.__b__
00000290: push.local.v local.__b__
00000298: conv.v.b
0000029C: bf 0x20C509C
000002A0: push.imm.e 2
000002A4: conv.i.v
000002A8: push.v pop
000002B0: push.v hap
000002B8: call action_if_variable(argc=3)
000002C0: pop.v.v local.__b__
000002C8: push.local.v local.__b__
000002D0: conv.v.b
000002D4: bf 0x20C509C
000002D8: push.s "nimsav_easbac"
000002E0: conv.s.v
000002E4: call action_save_game(argc=1)
000002EC: popz